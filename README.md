# Makaira App Boilerplate / Starterkit

[Next.js](https://nextjs.org/)  webapp as a starting point for creating makaira applications.

## Requirements

- NodeJS

## Local Setup

1. Run `npm ci`

## Local Development

### Tenants (Clients)

As default, the app will support multi tenants (clients) to access this app via multi Makaira instance.

You have to add new record for appInfo table inside Database to allow access app with multi tenant.

example:

```
insert into app_info(makaira_domain, makaira_instance, app_slug, app_secret, app_config) value("demo.makaira.io", "storefront", "app-boilerplate", "e8d4e7defffc2055ab5646b0ad724960", NULL);
```

Then you can access with url [http://localhost:3000/?hmac=a6cb894d51b1d33bf8376d2d9455436ec9739acaa79ccf94c720decd9c47c217&amp;nonce=123456&amp;domain=demo.makaira.io&amp;instance=storefront&amp;appType=app&amp;slug=123]()

#### For App serve only for 1 client 1 instance

- we support wrap page ``getServerSideProps`` with ``withMakaira`` . It will read Environment then generate HMAC token instead of call api **`/auth`** to api server
- When you provide 1 of below env, the app will become single TENANT

```
   MAKAIRA_APP_SECRET_CONTENT_WIDGET
   MAKAIRA_APP_SECRET_CONTENT_MODAL
   MAKAIRA_APP_SECRET
```

- Single Tenant required pair of env to verify auth in Nextjs

```
    MAKAIRA_APP_SECRET_CONTENT_WIDGET
    MAKAIRA_APP_SLUG_CONTENT_WIDGET
```

  or

```
    MAKAIRA_APP_SECRET_CONTENT_MODAL
    MAKAIRA_APP_SLUG_CONTENT_MODAL
```

  or

```
    MAKAIRA_APP_SECRET
    MAKAIRA_APP_SLUG
```

  or you can also provide 3 pair of ENVs to support all appType

Then you can remove prisma if you do not need database to store any data and access with url: http://localhost:3000?appType=`<app | content-modal | content-widget>`

### Inside the Makaira Admin UI

1. Run `npm run dev`
2. To start the local server with https, use ngrok: `ngrok http 3000`.
3. Register your App as described [in the documentation](https://docs.makaira.io/docs/apps#register-your-app-at-makaira) with the ngrok url as `externalURL`
4. Go to the Admin UI and select your App from the Dashboard to open it

### Standalone

#### For App serve only for 1 client 1 instance

1. Set the env variables `NEXT_PUBLIC_DEV_TOKEN`, `DEV_DOMAIN` and `DEV_INSTANCE`
2. 
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project structure

### Validate page requests from the Admin UI

As stated in the documentation the Admin UI will open your page with an HMAC and Nonce as URL search parameters.
These have to be validated on the server side because the app secret is required to generate the HMAC.
We use the [Next.js feature getServerSideProps](https://nextjs.org/docs/api-reference/data-fetching/get-server-side-props) for this. The provided function `withMakaira` will take care
of validating the request and also generating a second HMAC and Nonce which are required for retrieving the JWT User token.

To protect a page inside the Next.js pages folder use the following snippet.

```javascript
export const getServerSideProps = withMakaira()
```

The `withMakaira` function will add the following properties to every page that uses it.

```typescript
type MakairaAuthData = {
  // New generated HMAC which is used to receive the JWT-token from the Makaira Admin UI
  hmac: string
  // New generated nonce which is used to receive the JWT-token from the Makaira Admin UI
  nonce: string
  // Domain where the app was opened from
  domain: string
  // Instance where the app was opened from
  instance: string
  // HMAC that was received from the Makaira Admin UI. Is only null in standalone dev mode
  makairaHmac: string | null
}
```

If you want to fetch additional data on the initial request you can provide a function as first parameter to `withMakaira`

```typescript
import { GetServerSideProps } from 'next'

interface Data {
    value: string
}

const getAdditionalServerSideProps: GetServerSideProps<Data> = async () => {
  const res = await fetch('https://.../data')
  const data: Data = await res.json()
  
  return {
    props: data,
  }
}

export const getServerSideProps = withMakaira(getAdditionalServerSideProps)
```

### Retrieve data from the Admin UI

The complete communication with the Admin UI is handled inside the [MakairaAppProvider.tsx](./src/makaira/MakairaAppProvider.tsx)
so you don't have to worry about it. The Context will handle the JWT token exchange with the Admin UI.
To use it just wrap the page with it. In this repository this is done inside the [_app.tsx](./src/pages/_app.tsx).
This file is a [wrapper for every page in Next.js](https://nextjs.org/docs/advanced-features/custom-app),
so you can always access the context.

To access the context you can use the hook `useMakairaApp`

```typescript
const { token, domain, instance, client: makairaClient } = useMakairaApp()
```

### Send API-Request to Makaira

Here we also provide utils class, `MakairaClient`. The client can be retrieved as written above by using the `useMakairaApp`-Hook.
Every request that you want to send to the Makaira-API should be added inside [this file](./src/makaira/MakairaClient.ts).
The function `fetch(path: string, method: string = 'GET')` can be used to send the request with authentication to the correct instance.

This is an example request to get all feeds from Makaira:

```typescript
class MakairaClient {
    // ...
  
    async fetchFeeds(): Promise {
        const searchParams = new URLSearchParams()

        searchParams.append('_start', '0')
        searchParams.append('_end', '20')
        searchParams.append('_sort', 'changed')
        searchParams.append('_order', 'desc')

        return this.fetch(`productfeed?${searchParams.toString()}`)
    }

    // ...
}
```

To actually send the request we suggest to use [TanStack Query](https://github.com/TanStack/query) (formerly known as React Query).
It provides many useful utility functions for data fetching and caching. But of course you are free to use which library you want our even just use the default fetch function.

An example to fetch all feeds with the MakairaClient can be found here. The only noteworthy part here is the option `enabled`.
By setting this to `!!token` the API-Request will only be done if the token has been exchanged with the Makaira Admin UI.

```typescript
const { isLoading, data: feeds } = useQuery({
    queryKey: ['feeds'],
    queryFn: async () => await makairaClient.fetchFeeds(),
    enabled: !!token,
})
```

### Content-Widget routes

This boilerplate contains code so that you can use one instance of this boilerplate to serve an external app
and a content widget (apps embedded into the page editor) to Makaira. You can find an example page for a content widget
at the route `/content-widget` which is provided at the [/src/pages/content-widget.tsx](./src/pages/content-widget.tsx).
To define a route/page as content widget add its path to the array `CONTENT_WIDGET_PATHS` in [/src/utils/contentWidgetPaths.ts](./src/utils/contentWidgetPaths.ts).

Also, you have to provide the app secret and the slug for the content-widget part of your app as environment variables inside the `.env`.

```dotenv
NEXT_PUBLIC_APP_SLUG_CONTENT_WIDGET=<app-secret>
MAKAIRA_APP_SECRET_CONTENT_WIDGET=<app-slug>
```

## Learn More

- https://docs.makaira.io/docs/apps
- https://docs.makaira.io/docs/content-widgets

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
