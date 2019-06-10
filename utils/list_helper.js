const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    result = blogs.map(x => x.likes).reduce(reducer, 0)
    return result
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0){
        return {}
    }
    var blog = blogs[0];
    var max = blog.likes;
    for (var i = 1; i < blogs.length; i++){
        if (blogs[i].likes > max){
            blog = blogs[i];
            max = blogs[i].likes
        }
    }
    return blog
}

const mostBlogs = (blogs) => {
    if (blogs.length == 0){
        return null
    } else if (blogs.length == 1){
        return {author: blogs[0].author, blogs: 1}
    }
    var authors = [];
    var authorsAndBlogs = [];
    for (var i = 0; i < blogs.length; i++){
        var index = authors.indexOf(blogs[i].author)
        if (index == -1){
            authors.push(blogs[i].author)
            authorsAndBlogs.push({author: blogs[i].author, blogs: 1})
        } else {
            authorsAndBlogs[index].blogs++;
        }
    }
    var result = authorsAndBlogs[0];
    var max = result.blogs;
    for (var i = 0; i < authorsAndBlogs.length; i++){
        if (authorsAndBlogs[i].blogs > max){
            result = authorsAndBlogs[i]
            max = authorsAndBlogs[i].blogs
        }
    }
    return result
}

const mostLikes = (blogs) => {
    if (blogs.length == 0){
        return null
    } else if (blogs.length == 1){
        return {author: blogs[0].author, likes: blogs[0].likes}
    }
    var authors = [];
    var authorsAndLikes = [];
    for (var i = 0; i < blogs.length; i++){
        var index = authors.indexOf(blogs[i].author)
        if (index == -1){
            authors.push(blogs[i].author)
            authorsAndLikes.push({author: blogs[i].author, likes: blogs[i].likes})
        } else {
            authorsAndLikes[index].likes += blogs[i].likes;
        }
    }
    var result = authorsAndLikes[0];
    var max = result.likes;
    for (var i = 0; i < authorsAndLikes.length; i++){
        if (authorsAndLikes[i].likes > max){
            result = authorsAndLikes[i]
            max = authorsAndLikes[i].likes
        }
    }
    return result
}

  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }