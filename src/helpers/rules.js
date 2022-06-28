export const passwordNumber= (value) => /(?=.*\d)/g.test(value)
export const passwordCharachters= (value) => /(?=.*[a-z])/g.test(value)
export const passwordSpecialChar= (value) => /(?=.*[-_])/g.test(value)
export const passwordMinLength= (value) => /.{8,}/g.test(value)
export const confirmPasswordMatch=(param)=>(value) => {return param() === value}
export const onlyString= (value) => /[a-zA-z_-\s]$/g.test(value)