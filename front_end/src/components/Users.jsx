import React, {useState} from 'react'
import {Formik, Form, Field} from "formik";
import axios from "axios";

function Users() {
  const [state, setState]=useState({
    profileImage: ""
  })

  const setImage=(e, setFieldValue)=>{
    let canvas= document.getElementById("canvas");
    let ctx= canvas.getContext("2d");
    let maxWidth= 250;
    let maxHeight= 250;

    let img=new Image();
    img.onload=()=>{
      let imgWidth=   img.width;
      let imgHeight=  img.height;
      let scale= Math.min(maxWidth/ imgWidth, maxHeight/ imgHeight);
      // 250/imgWidthと250/imgHeightで小さい方をscaleに格納する。
      let imgWidthScaled=   imgWidth* scale;
      let imgHeightScaled=  imgHeight* scale;
      canvas.width=   imgWidthScaled;
      canvas.height=  imgHeightScaled;
      ctx.drawImage(img, 0, 0, imgWidthScaled, imgHeightScaled);
      // imgを左上詰めで大きさを取る。
      const resizeData= canvas.toDataURL("image/jpeg", 0.5);
      // toDataURLは、第一引数をデータ型に、第二引数は品質
      // よって今回の場合はjpeg形式に保存して、解像度は0.5にしてる。
      setState({profileImage: resizeData});
      // state.profileImageを更新
      setFieldValue("profile_image", resizeData);
      // setFieldValueっていう関数を実行してる。
      
      // それがどこにあるのかがわからない。。
    };
    img.src= URL.createObjectURL(e.target.files[0]);
    // createObjectは引数を参照するオブジェクトURLを作成する。
    // 今回は、貼り付けた画像をオブジェクトURLでimg.srcに格納する。
  };

  const createUser=(payload)=>{
    axios.post("http://localhost:3000/users", payload)
    .then(({data, message})=>{
      if(data){
        setState({user: data})
      }else{
        throw new Error(message);
      }
    })
    .catch((e)=>{
      console.log(e)
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        profile_image: ""
      }}
      onSubmit={()=>createUser()}
    >
      {({setFieldValue, isSubmitting}) => {
        return (
          <Form>
            <label>プロフィール画像</label>
            <img 
              className="profile-image"
              src={!state.profileImage?  "" : state.profileImage}
              alt=" "
            />
            <React.Fragment>
              <Field 
                id="select_profile_image"
                type="file"
                name="profile_image2"
                onChange={(e)=>setImage(e, setFieldValue)}
              />
              <Field type="hidden" name="profile_image" />
            </React.Fragment>
            <canvas 
              id="canvas"
              style={{
                display: "none"
              }}
              width=  "64"
              height= "64"
            />
            <label>名前</label>
            <Field className="input" type="text" name="name" />
            <button 
              className="submit-button"
              type="submit"
              disabled={isSubmitting}
            >
              送信
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Users
