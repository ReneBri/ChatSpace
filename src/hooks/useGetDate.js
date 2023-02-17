

export const useGetDate = () => {
    const currentdate = new Date()
    let date = currentdate.getDate() < 10 ? "0" + currentdate.getDate() : currentdate.getDate()
    let month = (currentdate.getMonth()+1) < 10 ? "0" + (currentdate.getMonth()+1) : (currentdate.getMonth()+1)
    let year = currentdate.getFullYear()
    let hours = currentdate.getHours() < 10 ? "0" + currentdate.getHours() : currentdate.getHours()
    let minutes = currentdate.getMinutes() < 10 ? "0" + currentdate.getMinutes() : currentdate.getMinutes()

    const datetime = date + "/"
                + month + "/" 
                + year + " @ "  
                + hours + ":"  
                + minutes

    return datetime
}