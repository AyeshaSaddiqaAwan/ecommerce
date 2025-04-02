/* eslint-disable prettier/prettier */
import React from 'react'
import { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'

import type { Product } from '../../../../payload/payload-types'
import { fetchDoc } from '../../../_api/fetchDoc'
import { fetchDocs } from '../../../_api/fetchDocs'
import { Blocks } from '../../../_components/Blocks'
import { PaywallBlocks } from '../../../_components/PaywallBlocks'
import { ProductHero } from '../../../_heros/Product'
import { generateMeta } from '../../../_utilities/generateMeta'

// Force this page to be dynamic so that Next.js does not cache it
export const dynamic = 'force-dynamic'

export default async function Product({ params: { slug } }) {
  const { isEnabled: isDraftMode } = await draftMode()

  let product: Product | null = null

  try {
    product = await fetchDoc<Product>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    console.error(error)
  }

  if (!product) {
    notFound()
  }

  const { relatedProducts } = product

  return (
    <>
      <ProductHero product={product} />
      {product?.enablePaywall && <PaywallBlocks productSlug={slug as string} disableTopPadding />}
      <Blocks
        disableTopPadding
        blocks={[
          {
            blockType: 'relatedProducts',
            blockName: 'Related Product',
            relationTo: 'products',
            introContent: [
              {
                type: 'h3',
                children: [
                  {
                    text: 'Related Products',
                  },
                ],
              },
            ],
            docs: relatedProducts,
          },
        ]}
      />
    </>
  )
}

export async function generateStaticParams() {
  try {
    const products = await fetchDocs<Product>('products')

    console.log('Fetched products:', products) // Debugging: Log fetched data

    if (!Array.isArray(products)) {
      console.error('Error: Expected an array, but received:', products)
      return []
    }

    return products
      .filter(product => {
        if (typeof product !== 'object' || !product.slug) {
          console.error('Invalid product format:', product) // Log unexpected data
          return false
        }
        return true
      })
      .map(product => ({ slug: product.slug }))
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    return []
  }
}


export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = await draftMode()

  let product: Product | null = null

  try {
    product = await fetchDoc<Product>({
      collection: 'products',
      slug,
      draft: isDraftMode,
    })
  } catch (error) { }

  return generateMeta({ doc: product })
}
