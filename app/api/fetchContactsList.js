export default function () {
  return fetch('https://randomuser.me/api/?results=10&noinfo')
    .then(response => response.json())
    .then((data) => {
      // handledData = JSON.stringify(data);
      // console.log(JSON.stringify(data));
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log('error: ' + error);
    });
}
