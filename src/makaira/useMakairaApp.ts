import { useContext } from 'react'

import {
  MakairaAppContext,
  MakairaAppContextData,
} from '@/makaira/MakairaAppProvider'


const useMakairaApp = (): MakairaAppContextData => {
  const { token, instance, domain, client } = useContext(MakairaAppContext)

  return { token, instance, domain, client }
}

export default useMakairaApp
