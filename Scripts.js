document.addEventListener("DOMContentLoaded", () => {
  let generatedOTP = document.querySelector(".otp-area");
  const submitBtn = document.querySelector(".submitButton");
  const otpInput = document.querySelector(".otp-input");
  let timer;
  const CountDownElement = document.querySelector(".countDown");

  const generateOTP = () => {
    const OTP = Math.floor(1000 + Math.random() * 9000); // Ensure OTP is a 4-digit number
    localStorage.setItem("OTP", OTP);
    generatedOTP.innerHTML = OTP;
    startTimer(10);
    if (OTP) {
      submitBtn.disabled = false;
    }
  };
  const startTimer = (duration = 60) => {
    let time = duration;
    CountDownElement.textContent = time;
    const progressBar = document.querySelector(".progress-bar");
    progressBar.style.width = "100%";
    clearInterval(timer);
    timer = setInterval(() => {
      time--;
      CountDownElement.textContent = time;
      const percentage = ((time - 1) / duration) * 100;
      progressBar.style.width = percentage + "%";
      if (time <= 0) {
        clearInterval(timer);
        progressBar.style.width = "0%";
        localStorage.removeItem("OTP");
        CountDownElement.textContent = "expired";
        document.querySelector(".submitButton").disabled = true;
        reSet();
      }
    }, 1000);
  };

  const reSet = () => {
    generatedOTP.innerHTML = "";
    document.querySelector(".otp-input").value = "";
    progressBar.style.transition = "none";
    progressBar.style.width = "100%";
  };

  submitBtn.disabled = true;
  const verifyOTP = () => {
    if (otpInput.value.length > 4) {
      otpInput.value = otpInput.value.slice(0, 4);
    }
    const userInput = document.querySelector(".otp-input").value.trim();
    if (userInput === "") {
      alert("Enter the OTP");
      return;
    }
    if (userInput === generatedOTP.innerHTML) {
      console.log("Success");
      reSet();
    } else {
      console.log("Please Enter correct OTP");
      document.querySelector(".otp-input").value = "";
    }
  };
  document.querySelector(".generateOTP").addEventListener("click", generateOTP);
  document.querySelector(".submitButton").addEventListener("click", verifyOTP);
});
