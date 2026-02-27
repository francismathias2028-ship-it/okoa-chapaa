const form = document.getElementById("eligibilityForm");
const result = document.getElementById("result");

form.addEventListener("submit", (e)=>{
  e.preventDefault();

  const name = document.getElementById("name").value;

  const eligible = Math.random() > 0.4;

  if(eligible){
    result.innerText = `🎉 ${name}, You are eligible for a loan!`;
    result.style.color="green";
  }else{
    result.innerText = `❌ ${name}, You are not eligible right now.`;
    result.style.color="red";
  }
});