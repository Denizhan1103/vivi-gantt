export default class Resizable {
  constructor(targetClass: string) {}

  static addListener(targetClass: string) {
    const target = document.querySelector(targetClass);
    console.log(target);
    if (target) {
      target.addEventListener("click", () => {
        console.log("alo");
      });
    }
  }
}
