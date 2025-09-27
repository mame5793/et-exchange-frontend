<template>
  <footer class="p-6" >
  <div class="container">


        <div class="content">
  <p class="question">Do you have any questions?</p>
  <p class="message">Any question or remarks? Just write us a message!</p>
  <SendMessage />
</div>
<div class="detail">
  <span class="slash">/</span><p>We will provide detailed information about our services, the types of work
     we do, and our top projects.This work is being released as open source for 
     the community, and we will be updating features daily. For more projects, 
     please contact us.</p>
    <div class="social"><Socialmediaicon /></div> 
</div>

  </div>
  <div class="mt-16 text-center text-xs border-t border-[#E6E6E6] border-opacity-20 pt-4 text-white">
  <p>Exchange rates are sourced from the banks' websites and updated instantly. Verify rates with your bank before making financial decisions.</p>
</div>

  </footer>
</template>

<script setup>



</script>

<style lang="scss" scoped>

footer {
  background-color: #0a0a0a; /* keeps consistent with dark theme */
}
.social{
  margin-top: 40px;
}
.container{
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap:5px;
 
 
}
.content{
  flex-grow: 1;
  flex-shrink: 1;
  padding-left: 10px;


  width:100%;

}
.question {
  font-weight: 500; 
 
 
  color: #E6E6E6; 
  font-size: 3.75rem;
}


.message {
  color: #E6E6E6; 
  margin-top: 10px;
}
.slash {
  align-items: self-start;
  justify-self: start;
  font-weight: bold;
  color: #4CAF50; /* Replace with your specific color code */
  font-size: 1.875rem;
  margin-right: 0.75rem;
  display: inline; /* Ensures slash is treated as an inline element */
}

.detail {

padding:10px;

  justify-self: center;
  text-align: center;

  color: white; /* Color for text inside .detail */
  flex-grow: 1;
  flex-shrink: 1;
 align-self: flex-center;
 width:100%;
}

.detail p{
 display: inline;
  margin-bottom: 20px; 
  }
  @media (max-width: 768px) {
   .container{
    flex-direction: column;

   }
.question{
  font-size: 2.55rem; 
}
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
  .question {
    font-size: 2.5rem;
  }
  .message {
    font-size: 1rem;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .question {
    font-size: 2rem;
  }
  .message {
    font-size: 0.9rem;
  }
  .detail p {
    font-size: 0.85rem;
  }
}
   
  }
</style>