import firebase from 'firebase/app';

interface Disp {
  dispatch: object;
  commit: object;
}

interface Str {
  email: string;
  password: string;
}


export default {
  actions: {
    // async login({dispatch, commit}: Disp, {email , password}: Str) {
    //   try {


    //       let currentUser;
    //       await firebase.database().ref('/users')
    //       .orderByChild('login')
    //       .equalTo(email)
    //       .on('child_added', (snapshot) => {
    
    //         currentUser = snapshot.val()
    //         console.log(currentUser)
    //       })
    
    
    






    //   } catch (e){
    //     throw e;
    //   }
    // }
  }
}