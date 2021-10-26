module.exports = {
  format_dates: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },
  firstInArrayUsername: arr => {
    return arr[0].user.username;
  }
};