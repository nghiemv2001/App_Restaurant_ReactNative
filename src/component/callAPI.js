export const createAPI = ({ URLink,fdata}) => {
  return new Promise((resolve, reject) => {
    fetch(URLink, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fdata),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.log(data.error);
          reject(data.error);
        } else {
          resolve(data);
        }
      })
      .catch(error => {
        console.error('Lỗi :', error);
        reject(error);
      });
  });
};

export const getAPI = ({ linkURL }) => {
  return fetch(linkURL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Mạng mất kết nối');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Lỗi:', error);
    });
};

export const DeteleAPI = ({ URLink }) => {
  return new Promise((resolve, reject) => {
    fetch(URLink, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      resolve(data);
    })
    .catch(error => {
      console.error('Lỗi xóa đối tượng:', error);
      reject(error);
    });
  });
};

export const editAPI = ({ URLink, updates }) => {
  return new Promise((resolve, reject) => {
    fetch(URLink, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Mạng không ổn định');
        }
        return res.json();
      })
      .then(data => {
        resolve(data);
      })
      .catch(error => {
        console.error('Lỗi:', error);
        reject(error);
      });
  });
};