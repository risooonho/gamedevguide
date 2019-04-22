import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
import { Layout as AntdLayout } from 'antd'
import Header from '../Header/Header'
import siteCfg from '../../../SiteCfg'

import SidebarContents from '../SidebarContents'
import TableOfContents from '../TableOfContents'

// import { prettifyPath, safeGetWindowPath } from '../../../gatsby/utils'

const { Content: AntdContent } = AntdLayout

const RootLayout = ({ children, sidebarRoot }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            siteNavTitle
            siteTitleLong
            siteDescription
            siteKeywords
          }
        }
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={data => {
      const { siteNavTitle, siteTitleLong, siteDescription, siteKeywords } = data.site.siteMetadata

      return (
        <AntdLayout>
          <Helmet
            title={siteTitleLong}
            meta={[
              { name: 'description', content: siteDescription },
              { name: 'keywords', content: siteKeywords },
            ]}
          >
            <html lang="en" />
          </Helmet>

          <AntdLayout>
            <SidebarContents sidebarRoot={sidebarRoot} />
            <AntdLayout style={{ marginLeft: siteCfg.theme.sidebarMenuWidth }}>
              <Header siteNavTitle={siteNavTitle} />
              <AntdLayout>
                <AntdContent
                  style={{
                    background: '#fff',
                    padding: 48,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  {children}
                </AntdContent>
                <TableOfContents />
              </AntdLayout>
            </AntdLayout>
          </AntdLayout>
        </AntdLayout>
      )
    }}
  />
)

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

// const mapDispatchToProps = {
//  // setPostPageOn,
//  // setPostPageOff,
//  onSetSidebarDocked
// }

// export default connect(()=>({}), mapDispatchToProps) (RootLayout)
export default RootLayout
