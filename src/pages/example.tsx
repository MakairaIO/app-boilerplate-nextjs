import { FaArrowLeft } from 'react-icons/fa'

import { PageWrapper, Link, Button, Tabs } from '@/components'
import { withMakaira } from '@/makaira/withMakaira'

export default function Example() {
  return (
    <PageWrapper title="Example page" prefix="You are looking at">
      <Link pathname="/">
        <Button icon={FaArrowLeft} variant="primary" iconPosition="left">
          Back to homepage
        </Button>
      </Link>
      <Tabs defaultActiveKey="1"
        items={[
          {
            title: 'Tab 1',
            key: '1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper odio eget ex tempor consequat. Aenean eu sapien facilisis odio porta ultrices non at nibh. Maecenas nec commodo dolor. Nunc in lorem eget mi aliquet molestie id non leo. Donec magna velit, suscipit ac dui sollicitudin, ornare pellentesque odio. In tempor pretium purus, vitae accumsan lectus placerat nec. Vestibulum fermentum arcu eu diam dapibus volutpat. Donec tempus efficitur turpis sit amet tristique. Etiam fermentum lectus vitae enim consequat semper ac ut nulla. Aenean eget libero id diam vehicula rhoncus nec vitae urna. Sed consectetur at nisl in tristique. Maecenas nunc nisl, semper sit amet enim non, varius hendrerit lacus. In hac habitasse platea dictumst. Nunc bibendum accumsan dolor, id consequat magna aliquet at. Aenean quis ante cursus, venenatis libero vel, ultricies lectus. Nulla purus nibh, vestibulum ac odio quis, porta efficitur ipsum. Etiam posuere accumsan cursus. Etiam efficitur libero sit amet euismod euismod. Quisque viverra consectetur dictum. Aenean vitae sapien metus. Donec vitae augue malesuada, luctus lectus semper, dictum turpis. Vivamus malesuada nisi dui, nec imperdiet velit faucibus at. Donec ut velit libero. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam in feugiat sem, a tincidunt magna.',
          },
          {
            title: 'Tab 2',
            key: '2',
            content: <p>Curabitur sed ligula sit amet quam hendrerit vulputate ut a enim. In vel ullamcorper risus, eget tempor magna. Duis pharetra erat nec nunc rutrum, eget ultricies purus finibus. Morbi semper libero sit amet augue vehicula, nec interdum risus interdum. In fermentum eu diam nec vestibulum. Cras augue neque, pretium eu risus non, porta bibendum urna. Morbi mollis ex lorem, eu efficitur justo ornare a. Donec sit amet quam sit amet orci suscipit ultricies tempor ac metus. Nulla sollicitudin nibh et odio bibendum, sed faucibus justo euismod. Nam consectetur porta eleifend. Vestibulum eget dui urna. Nunc id tempus tellus. Aliquam sodales elit vel lacinia vulputate.</p>,
            // disabled: true,
          },
          {
            title: 'Tab 3',
            key: '3',
            content: 'Etiam eget consectetur sapien. Nam at sodales nulla, et sollicitudin arcu. Quisque a vulputate nisi. Vivamus consequat, ipsum eget aliquet auctor, nisi quam dapibus massa, ut dapibus elit odio quis purus. Ut id nunc quis tortor blandit tristique. Etiam sit amet eros interdum, condimentum enim quis, malesuada eros. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur semper sapien quis leo sodales, ut elementum sem dignissim. Pellentesque quis tellus ut libero sodales ornare. Proin maximus maximus mauris, quis accumsan ligula ullamcorper ac. Donec justo sem, aliquam suscipit nibh consequat, blandit posuere neque. Nunc vehicula ligula sit amet enim suscipit, a lacinia est malesuada. Fusce sed quam pulvinar ex ullamcorper viverra. Nullam mattis, diam ac gravida iaculis, nibh nisl aliquet erat, quis ultricies ante nisl vel elit. Nulla cursus nibh eu sapien scelerisque tincidunt.',
          },
        ]}>

      </Tabs>
    </PageWrapper>
  )
}

export const getServerSideProps = withMakaira()
