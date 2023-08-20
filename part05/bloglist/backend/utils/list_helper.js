const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce( (total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce( (favorite, current) => {
        if (favorite == null || current.likes > favorite.likes) {
            return current
        } else {
            return favorite
        }
    }, null)
}

const getMostAuthorHelper = (authors_object) => {
    const authors_list = []
    for (let author in authors_object) {
        authors_list.push([author, authors_object[author]])
    }
    const sorted_authors = [...authors_list]
        .sort( (a,b) => a[1] - b[1] )
        .reverse()
    return sorted_authors[0]
}

const mostBlogs = (blogs) => {
    // Count each author's blogs
    const authors = {}
    for (let blog of blogs) {
        if (!(blog.author in authors)) {
            authors[blog.author] = 0
        }
        authors[blog.author] += 1
    }
    const mostBlogsAuthor = getMostAuthorHelper(authors)
    
    return {
        'author': mostBlogsAuthor[0],
        'blogs': mostBlogsAuthor[1],
    }
}

const mostLikes = (blogs) => {
        // Count each author's likes
        const authors = {}
        for (let blog of blogs) {
            if (!(blog.author in authors)) {
                authors[blog.author] = 0
            }
            authors[blog.author] += blog.likes
        }
        const mostLikesAuthor = getMostAuthorHelper(authors)
        
        return {
            'author': mostLikesAuthor[0],
            'likes': mostLikesAuthor[1],
        }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }