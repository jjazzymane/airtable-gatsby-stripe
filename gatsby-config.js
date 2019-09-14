require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Jasmine's Ecommerce Tester!`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_SUPER_SECRET,
        tables: [
          {
            baseId: `appCqUhua38L9eFcO`,
            tableName: `CARDS`,
            tableView: `Grid view`,
            queryName: `Products-and-plans`,
             mapping: {
              ["FEATURES"]: `text/markdown`
            },  // e.g. fileNode, text/markdown
            tableLinks: [`FEATURES`, `IN_FULL`, `MONTHLY`, `BI_WEEKLY`, `GROUP_15`, `GROUP_25`]
          },
          {
            baseId: `appCqUhua38L9eFcO`,
            tableName: `FEATURES`,
            tableView: `Grid view`,
            queryName: `ProductFeatures`,
            tableLinks: [`CARDS`]
          },
          {
            baseId: `appCqUhua38L9eFcO`,
            tableName: `IN_FULL`,
            tableView: `Grid view`,
            queryName: `ProductPriceFull`,
            tableLinks: [`CARDS`]
          },
          {
            baseId: `appCqUhua38L9eFcO`,
            tableName: `MONTHLY`,
            tableView: `Grid view`,
            queryName: `ProductPriceMonthly`,
            tableLinks: [`CARDS`]
          },
          {
            baseId: `appCqUhua38L9eFcO`,
            tableName: `BIWEEKLY`,
            tableView: `Grid view`,
            queryName: `ProductPriceBiWeekly`,
            tableLinks: [`CARDS`]
          },
          {
            baseId: `appCqUhua38L9eFcO`,
            tableName: `GROUP`,
            tableView: `Grid view`,
            queryName: `ProductPrice_ClientGroups`,
            tableLinks: [`CARDS`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-source-stripe`,
      options: { 
        objects: ['Product','Plan', 'Subscription', 'Customer'],
        secretKey:process.env.STRIPE_SECRET_KEY,
        downloadFiles: true,

      }
    },
    `gatsby-plugin-stripe`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
