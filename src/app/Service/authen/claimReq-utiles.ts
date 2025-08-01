export const claimReq={
    admin:(x:any) => x.role == "admin",
    user:(x:any) => x.role == "user"
}