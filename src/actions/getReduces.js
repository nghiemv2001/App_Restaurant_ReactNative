
export const getBills = () => {
    return new Promise( (resolve, reject) =>{
        fetch('http://192.168.135.1:3000/bills/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => resolve(data),
        )
        .catch(error => console.log(error));
    })
}

export const getCategory = () => {
  return new Promise( (resolve, reject) =>{
      fetch('http://192.168.135.1:3000/category/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => resolve(data),
      )
      .catch(error => console.log(error));
  })
}


export const getInvoices = () => {
  return new Promise( (resolve, reject) =>{
      fetch('http://192.168.135.1:3000/invoices/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => resolve(data),
      )
      .catch(error => console.log(error));
  })
}


export const  getTableList = () => {
  return new Promise( (resolve, reject) =>{
      fetch('http://192.168.135.1:3000/tables/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(data => resolve(data),
        )
        .catch(error => console.log(error));
  })
}

export const getUsers = () => {
  return new Promise( (resolve, reject) =>{
      fetch('http://192.168.135.1:3000/users/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => resolve(data),
      )
      .catch(error => console.log(error));
  })
}

