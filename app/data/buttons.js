import buttonsStyles from "../assets/styles/ProfileButtons";


let btnsData = {};

export function setData(props, saveContact, removeContact) {
  // removeContact = false

  let buttonsArr = [
    // {
    //   btnStyle: buttonsStyles.button,
    //   linkingUrl: `tel:${props.phone}`,
    //   img: 'https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/phone-icon-18-256.png',
    //   imgStyle: {width: 20, height: 20}
    // },
    {
      btnStyle: buttonsStyles.button,
      linkingUrl: `tel:${props.phone}`,
      iconName: 'phone',
      imgStyle: {width: 20, height: 20}
    },
    {
      btnStyle: buttonsStyles.button,
      linkingUrl: `mailto:${props.email}`,
      iconName: 'email',
      imgStyle: {width: 20, height: 20}
    },{
      btnStyle: [buttonsStyles.button],
      onPressBtn: saveContact,
      iconName: 'person-add',
      imgStyle: {width: 20, height: 20}
    }
  ];

  let removeBtn = {
    btnStyle: [buttonsStyles.button],
    onPressBtn: removeContact,
    iconName: 'delete',
    imgStyle: {width: 20, height: 20}
  };

  if(removeContact && props.user.saved) {

    buttonsArr[2].iconName = 'save';
    buttonsArr.push(removeBtn);

    buttonsArr.forEach((item) => {
      item.btnStyle = buttonsStyles.smallButton;
    })

  }

  return buttonsArr;
}



// export default setData;