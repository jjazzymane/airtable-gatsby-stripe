exports.createResolvers = ({ 
    actions, 
    cache,
    createNodeId, 
    createResolvers, 
    getNodesByType,
    getNodes,
    store, 
    reporter,
}) => {
    const { createNode } = actions
    createResolvers({ 
        StripePlanGroupConnection: {
            productName: {
                type: 'String',
                resolve(source, _args, context, _info) {
                    const stripeProduct = getNodesByType(`StripeProduct`)
                    
                    //return source.fieldValue

                    for (yaya in stripeProduct) { 
                        if (stripeProduct[yaya].id === source.fieldValue ) { 
                            return stripeProduct[yaya].name
                        }
                    }
                }
            }

        },
    })
}

exports.onCreateNode = ({ node, actions, getNodes, createNodeId, createContentDigest }) => {
    if (node.internal.type !== `Airtable`|| node.queryName !== `Products-and-plans`) {
        return;
    }

    const data = {
        id: createNodeId(`CoachClaraAirtable-${node.id}`),
        titleTiny: node.data.TINY_TITLE,
        titleProduct: node.data.PROGRAM_TITLE,
        descriptionProgram: node.data.PROGRAM_DESCRIPTION,
        descriptionCost: node.data.COST_DESCRIPTION,
    }
    actions.createNode({
        parent: node.id,
        ...data,
        internal: { 
            type: `CoachClaraAirtable`,
            contentDigest: createContentDigest(data)
        }
    })
}

exports.sourceNodes = ({ actions, schema, getNodesByType }) => {
    actions.createTypes(
        schema.buildObjectType({
            name: 'CoachClaraAirtable',
            interfaces: ['Node'],
            fields: {
                id:{type: 'ID!'},
                titleTiny:{type: 'String'},
                titleProduct:{type: 'String'},
                descriptionProgram:{type: 'String'},
                descriptionCost:{type: 'String'},
                features: {
                    type: ['String'],
                    resolve: async (source,_args, context, info) => {
                        // breakthorugh moment: so source are nodes with cards table, their feature node contains a list of node ids. 
                        // these node ids correspond to the features table and the 'productfeatures' query. 
                        // create a for loop that finds the corresponding productfeatures nodes for what is inside source.data.features
                        const airtableNode = context.nodeModel.getNodeById({ id: source.parent })
                        const featuresField = airtableNode.data.FEATURES___NODE
                        
                        //console.log(airtableNode)
                        
                        // retrieve Feature table
                        const allAirtable = getNodesByType('Airtable')
                        const whtIwant = []

                        for (featID in featuresField) {
                            // now we know that we are getting one node id for each item in the features list 
                            // should see Yaaaa repeated many times 
                            //console.log(`${featuresField[featID]} Yaaaa`)

                            // sift through all airtable nodes then filter for node with specific id
                            for (deedee in allAirtable) {
                                const checkAgainstID = allAirtable[deedee].id
                                if (featuresField[featID] === checkAgainstID){
                                    
                                    whtIwant.push(allAirtable[deedee].data.FEATURE_NAME)
                                }
                            }
                        }
                        // return the new array 
                        return whtIwant
                    },
                },
                // next : put the plans in a wrapper called "plans", it takes a type as well. create a type for
                planFULL: {
                    //node.data.ONE_TIME.data.COST_OPT_FULL
                    type: 'Float',
                    resolve: async( source, args, context, info) => {

                        //RETRIEVE THE SOURCE NODE'S NODES & OUR
                        const cardsTableNode = context.nodeModel.getNodeById({ id: source.parent })
                        const cardTableField = cardsTableNode.data.IN_FULL___NODE

                        // RETRIEVE THIS FIELD'S PARENT TABLE
                        const allAirtable = getNodesByType('Airtable')
                        
                        for (searchId in cardTableField){
                            for (deedee in allAirtable) {

                                const checkAgainstID = allAirtable[deedee].id
                                if (cardTableField[searchId] ===checkAgainstID){
                                    
                                    const parentTableField = allAirtable[deedee].data.COST_OPT_FULL
                                    return parentTableField 
                                }
                            }
                        }
                        
                    } 
                },
                planBWKLY: {
                    //node.data.BI_WEEKLY.data.COST_OPT_BIWEEKLY
                    type: 'Float',
                    resolve: async( source, args, context, info) => {

                        //RETRIEVE THE SOURCE NODE'S NODES & OUR
                        const cardsTableNode = context.nodeModel.getNodeById({ id: source.parent })
                        const cardTableField = cardsTableNode.data.BI_WEEKLY___NODE

                        // RETRIEVE THIS FIELD'S PARENT TABLE
                        const allAirtable = getNodesByType('Airtable')
                        
                        for (searchId in cardTableField){
                            for (deedee in allAirtable) {

                                const checkAgainstID = allAirtable[deedee].id
                                if (cardTableField[searchId] ===checkAgainstID){
                                    
                                    const parentTableField = allAirtable[deedee].data.COST_OPT_BIWEEKLY
                                    return parentTableField 
                                }
                            }
                        }

                    } 
                },
                planMONTHLY: {
                    //node.data.MONTHLY.data.COST_OPT_MTHLY
                    type: 'Float',
                    resolve: async( source, args, context, info) => {

                        //RETRIEVE THE SOURCE NODE'S NODES & OUR
                        const cardsTableNode = context.nodeModel.getNodeById({ id: source.parent })
                        const cardTableField = cardsTableNode.data.MONTHLY___NODE

                        // RETRIEVE THIS FIELD'S PARENT TABLE
                        const allAirtable = getNodesByType('Airtable')
                        
                        for (searchId in cardTableField){
                            for (deedee in allAirtable) {

                                const checkAgainstID = allAirtable[deedee].id
                                if (cardTableField[searchId] ===checkAgainstID){
                                    
                                    const parentTableField = allAirtable[deedee].data.COST_OPT_MTHLY
                                    return parentTableField 
                                }
                            }
                        }

                    } 
                },
                planGROUP15: {
                    //node.data.GROUP_15.data.COST_OPT_GROUP
                    type: 'Float',
                    resolve: async( source, args, context, info) => {

                       //RETRIEVE THE SOURCE NODE'S NODES & OUR
                       const cardsTableNode = context.nodeModel.getNodeById({ id: source.parent })
                       const cardTableField = cardsTableNode.data.GROUP_15___NODE

                       // RETRIEVE THIS FIELD'S PARENT TABLE
                       const allAirtable = getNodesByType('Airtable')
                       
                       for (searchId in cardTableField){
                           for (deedee in allAirtable) {

                               const checkAgainstID = allAirtable[deedee].id
                               if (cardTableField[searchId] ===checkAgainstID){
                                   
                                   const parentTableField = allAirtable[deedee].data.COST_OPT_GROUP
                                   return parentTableField 
                               }
                           }
                       }

                    } 
                },
                planGROUP25: {
                    //node.data.GROUP_25.data.COST_OPT_GROUP
                    type: 'Float',
                    resolve: async( source, args, context, info) => {

                       //RETRIEVE THE SOURCE NODE'S NODES & OUR
                       const cardsTableNode = context.nodeModel.getNodeById({ id: source.parent })
                       const cardTableField = cardsTableNode.data.GROUP_25___NODE

                       // RETRIEVE THIS FIELD'S PARENT TABLE
                       const allAirtable = getNodesByType('Airtable')
                       
                       for (searchId in cardTableField){
                           for (deedee in allAirtable) {

                               const checkAgainstID = allAirtable[deedee].id
                               if (cardTableField[searchId] ===checkAgainstID){
                                   
                                   const parentTableField = allAirtable[deedee].data.COST_OPT_GROUP
                                   return parentTableField 
                               }
                           }
                       }

                    } 
                },
                newProducts: {
                    // goal: see if data in airtable is same as in stripe
                    // true: return statement that this title is already a product 
                    // false: return a button to create that item in stripe
                    type: [`String!`],
                    resolve: async(source, args, context, info) => {
                        const whtIwant = []
                        const checkLen = []
                        const reallyWhtIwant = []

                        //RETRIEVE THE SOURCE NODE FOR TITLENAMES
                        const thisNode = context.nodeModel.getNodeById({ id: source.id })
                        const thisField = thisNode.titleProduct
                        //console.log(thisField)

                        //RETRIEVE NODES FROM STRIPEPRODUCT
                        const allStripeProduct = getNodesByType('StripeProduct')
                        for (existing in allStripeProduct) {
                            const allStripeProductField = allStripeProduct[existing].name
                            //console.log(allStripeProductField.toLowerCase())
                            checkLen.push(allStripeProductField)
                            if (allStripeProductField.toLowerCase() === thisField.toLowerCase()) {
                               //console.log(true)
                            } else { 
                                //console.log(false)
                                //console.log(thisField)
                                whtIwant.push(thisField)
                            }
                        }

                        // checking the array lengths
                        // why: when running through the array of all products in Stripe 
                        // and they all return false, then I want this resolver to return the first item 
                        // in the list. If the lengths are not equal it returns an empty array [] value.
                        // question: can we skip empty [] values in arrays when retreiving the data on a page?
                        if (whtIwant.length === checkLen.length) {
                            console.log(`3 false: ${whtIwant}`)
                            for (n in whtIwant) {
                                // n is an index number; type: string 
                                if ( n === "0" ) { 
                                    console.log(whtIwant[n])
                                    reallyWhtIwant.push(whtIwant[n]) 
                                }
                            }
                        }
                        
                        return reallyWhtIwant
                        
                    }
                }
            }
        })
    )
}


