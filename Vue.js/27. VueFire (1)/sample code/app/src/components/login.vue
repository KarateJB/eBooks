<template>
  <div class="card">
    <div class="card-block">
        <div class="card-text">
            <div v-if="!isAuth" class="text-center">

                <div class="container">
                    <div class="row">
                        <div class="col-md-6">
                            <button class="btn btn-toolbar" @click="login('google')">
                                <img width="30" src="../assets/images/google-logo.png" />
                                Use Google Account
                            </button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-toolbar" @click="login('facebook')">
                                <img width="30" src="../assets/images/facebook-logo.png" />
                                Use Facebook Account
                            </button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <div class="row">
                        <div class="col-md-6">
                            <button class="btn btn-toolbar" @click="login('twitter')">
                                <img width="30" src="../assets/images/twitter-logo.png" />Use My Twitter Account
                            </button>
                        </div>
                        <div class="col-md-6">
                            <button class="btn btn-toolbar" @click="login('github')">
                                <img width="30" src="../assets/images/github-logo.png" />
                                Use Github Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center">
                <table class="table">
                    <tr>
                        <td class="text-center">
                            <label class="control-label">{{ user.displayName }}</label>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-center">
                            <img :src="user.photoURL" width="100px" height="100px"/> 
                        </td>
                    </tr>
                    <tr>
                            <td class="text-center">
                                Phone number: <label class="control-label">{{ user.phoenNumber || '(no phone number)'}}</label>
                            </td>
                        </tr>
                    <tr>
                        <td class="text-center">
                            Email: <label class="control-label">{{ user.email || '(no email)'}}</label>
                        </td>
                    </tr>                 
                </table>
                <div>
                    <input type="button" class="btn btn-warning" @click="logout" value="Logout" />
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "login",
  data() {
    return {
      user: null,
      isAuth: false //Is authorized flag
    };
  },
  methods: {
    login(providerName) {
      let provider = null;
      switch (providerName) {
        case "google":
          provider = new firebase.auth.GoogleAuthProvider();
          break;
      }

      firebaseAuth.signInWithPopup(provider)
        .then(result => {
          this.user = result.user;

        }).catch(err => console.error(err));
    },

    logout() {
      firebaseAuth.signOut()
        .then(() => {
          this.user = null;
          this.isAuth = false;
        }).catch(err => console.log(error));
    }
  },
  beforeCreate(){
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          this.user = user;
          this.isAuth = true;
        }
      })
  },
  created() {
      console.log(firebaseDb);
      console.log(firebaseAuth);
  }
};
</script>
