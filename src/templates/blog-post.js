import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import SEO from '../components/SEO'

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  date,
  title,
  helmet,
  featuredimage,
}) => {
  const PostContent = contentComponent || Content

  return (
    
  
    <section className="section">
      {helmet || ''}
     
      <div className="featured-image-full">
                   <PreviewCompatibleImage
                     imageInfo={{
                       image: featuredimage ,
                       alt: `alt tag {featuredimage} `,
                     }}
                   />
                 </div>
      <div className="container content">
   
               
        <div className="columns">
          <div itemScope itemType="http://schema.org/NewsArticle" className="column is-10 is-offset-1">
          <header>
                 
         
           
             </header>
            <h1 itemProp="headline" className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p itemProp="datePublished">Date published: <time dateTime={date}>
                  {date}
                  </time> </p>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
  date: PropTypes.string,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        date={post.frontmatter.date}
        featuredimage={post.frontmatter.featuredimage}
        url="www"
        helmet={
          <Helmet titleTemplate="%s | Conveyancing Covered">
            <title>{`${post.frontmatter.title}`}</title>
            <meta content="keywords"/>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
            <meta property="og:title" content={`${post.frontmatter.title}`}/>
                    

           
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 1600, quality: 100) {
              ...GatsbyImageSharpFluid
              }
          }
        }
      }
    }
  }
`
