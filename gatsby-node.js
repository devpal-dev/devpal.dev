const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      query SkillPages {
        allJsFrontmatter {
          edges {
            node {
              data {
                pageSlug
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allJsFrontmatter.edges.map(({ node }) => {
        if (
          node.data.pageSlug !== null &&
          node.data.pageSlug !== "/portfolio"
        ) {
          createPage({
            path: node.data.pageSlug,
            component: path.resolve(`./src/layouts/skill.js`),
            context: {
              pageSlug: node.data.pageSlug,
            },
          })
        }

        if (node.data.pageSlug == "/portfolio") {
          createPage({
            path: node.data.pageSlug,
            component: path.resolve(`./src/layouts/portfolio.js`),
            context: {
              pageSlug: node.data.pageSlug,
            },
          })
        }
      })
      resolve()
    })
  })
}
