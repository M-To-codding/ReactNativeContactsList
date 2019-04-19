import profileStyles from "../assets/styles/Profile";


let btnsData = {};

export function setData(props, saveContact) {
  return [
    {
      btnStyle: profileStyles.button,
      linkingUrl: `tel:${props.phone}`,
      img: 'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png',
      imgStyle: {width: 20, height: 20}
    },
    {
      btnStyle: profileStyles.button,
      linkingUrl: `mailto:${props.email}`,
      img: 'https://cdn.pixabay.com/photo/2013/04/01/21/31/mail-99218_640.png',
      imgStyle: {width: 20, height: 20}
    },
    {
      btnStyle: [profileStyles.button],
      onPressBtn: saveContact,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUYw0HQJzifmBIw49AqI5y82JUnP8EZKt2Pw0eE_at-vRJ4YRDg',
      imgStyle: {width: 20, height: 20}
    },
  ];
}



// export default setData;