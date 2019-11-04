var fn1 = async () => {
  var x;
  setTimeout(() => {
    x = 1;
  }, 2000);
  return x;
};

var fn2 = async fn1 => {
  let x = await fn1();
  console.log(x);
  console.log("a");
};
fn2(fn1);
