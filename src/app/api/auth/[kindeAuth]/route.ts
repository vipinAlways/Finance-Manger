import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth({
    async postLoginRedirectURL() {
        return "/dashboard"; 
      },
      async postSignupRedirectURL() {
        return "/dashboard"; 
      },
});
