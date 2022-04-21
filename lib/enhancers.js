import {
  createContentfulEnhancer,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  createContentfulQueryEnhancer,
  CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
  ContentfulClientList,
} from '@uniformdev/canvas-contentful'
import { enhance, EnhancerBuilder } from '@uniformdev/canvas'
import { createClient } from 'contentful'


export const articleListingDataEnhancer = async ({ component, context }) => {
  if (component?.parameters?.category?.value?.entryId) {
    const entries = await context.client.getEntries({
      content_type: 'article',
      'fields.categories.sys.id':
        component?.parameters?.category?.value?.entryId,
    })

    return entries.items || []
  } else {
    const entries = await context.client.getEntries({
      content_type: 'article',
    })
    return entries.items || []
  }
}

export const articleDataEnhancer = async ({ component, context }) => {
  console.log(context?.params?.id)
  if (context?.params?.id) {
    return await context.client.getEntry(context?.params?.id)
  }
  return null
}

export const enhanceDefaultComposition = async (composition, ctfSpace, ctfApiKey, params) =>{
    // instantiate a standard Contentful client
    const client = createClient({
      space: ctfSpace,
      environment: 'master',
      accessToken: ctfApiKey,
    })

    // instantiate a ContentfulClientList that contains the Contentful client instance
    // NOTE: the ContentfulClientList allows you to use Canvas data that references multiple spaces / environments
    // by providing a Contentful client for each space / environment.
    const clientList = new ContentfulClientList([
      { spaceId: ctfSpace, environmentId: 'master', client },
    ])

    // instantiate a Contentful enhancer
    const contentfulEnhancer = createContentfulEnhancer({ client: clientList })
    const contentfulQueryEnhancer = createContentfulQueryEnhancer({
      clients: clientList,
    })

    // calling "enhance" to enhance the composition with data
    // we can pass a context object that typically stores the context locale or preview=true|false
    await enhance({
      composition,
      enhancers: new EnhancerBuilder()
        .component('articleListing', (articleListing) =>
          articleListing.data('articles', articleListingDataEnhancer)
        )
        .component('article', (article) =>
          article.data('article', articleDataEnhancer)
        )
        .parameterType(
          CANVAS_CONTENTFUL_PARAMETER_TYPES,
          contentfulEnhancer
        )
        .parameterType(
          CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
          contentfulQueryEnhancer
        ),
      context: { client: client, params: params },
    })


}