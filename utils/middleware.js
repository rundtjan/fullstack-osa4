  const eiLoydy = (req, res) => {
    res.status(404).send({error:'sivua ei löydy'})
  }
  
  const virheHandlaaja = (error, req, res, next) => {
    console.log(error.name)
    if (error.name === 'ValidationError') {
      return res.status(400).json({error: error.message})
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({
          error: 'invalid token'
        })
    }
  
    next(error)
  }

  const tokenizer = (req, res, next) => {
    const auth = req.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      req.token = auth.substring(7)
      console.log(req.token)
      next()
    }
    next()
  }
  
  
  module.exports = {
    eiLoydy,
    virheHandlaaja,
    tokenizer
  }