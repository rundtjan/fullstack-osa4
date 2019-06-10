  const eiLoydy = (req, res) => {
    response.status(404).send({error:'sivua ei löydy'})
  }
  
  const virheHandlaaja = (error, req, res, next) => {
    console.log(error.name)
    if (error.name === 'ValidationError') {
      return response.status(400).json({error: error.message})
    }
  
    next(error)
  }
  
  
  module.exports = {
    eiLoydy,
    virheHandlaaja
  }