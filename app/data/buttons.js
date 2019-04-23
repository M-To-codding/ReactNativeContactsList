import buttonsStyles from "../assets/styles/ProfileButtons";


let btnsData = {};

export function setData(props, saveContact, removeContact) {
  // removeContact = false

  let buttonsArr = [
    {
      btnStyle: buttonsStyles.button,
      linkingUrl: `tel:${props.phone}`,
      img: 'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png',
      imgStyle: {width: 20, height: 20}
    },
    {
      btnStyle: buttonsStyles.button,
      linkingUrl: `mailto:${props.email}`,
      img: 'https://cdn.pixabay.com/photo/2013/04/01/21/31/mail-99218_640.png',
      imgStyle: {width: 20, height: 20}
    },{
      btnStyle: [buttonsStyles.button],
      onPressBtn: saveContact,
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbUYw0HQJzifmBIw49AqI5y82JUnP8EZKt2Pw0eE_at-vRJ4YRDg',
      imgStyle: {width: 20, height: 20}
    }
  ];

  let removeBtn = {
    btnStyle: [buttonsStyles.button],
    onPressBtn: removeContact,
    img: 'https://www.colourbox.com/preview/15287136-trash-can-flat-white-color-icon.jpg',
    imgStyle: {width: 20, height: 20}
  };

  if(removeContact && props.user.saved) {

    buttonsArr[2].img = 'data:image/png;base64,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';
    buttonsArr.push(removeBtn);

    buttonsArr.forEach((item) => {
      item.btnStyle = buttonsStyles.smallButton;
    })

  }

  return buttonsArr;
}



// export default setData;