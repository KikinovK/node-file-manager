export function parseUserName(args) {
  const userNameArg = args.find(arg => arg.startsWith('--username='));
  let userName = '';
  if (userNameArg) {
    const userNameValue = userNameArg.split('=')[1];
    if (userNameValue) {
      userName = userNameValue.toCapitalizeCase();
    }
  }
  return userName;
}
