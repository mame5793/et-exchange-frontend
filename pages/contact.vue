<template>
  <header>
<logo />
  </header>
    <main class="max-w-6xl mx-auto relative pb-20 px-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-5">
      
        <div class="order-2 md:order-1 flex justify-center items-center">
          <img
            alt="Contact Us"
            loading="lazy"
            width="2346"
            height="2346"
            class="w-auto h-full object-contain"
            src="/images/xet_circle_logo.webp"
          />
        </div>
     
        <div class="text-white max-w-lg order-1 md:order-2">
          <div class="mt-10">
            <p class="font-bold text-3xl text-center md:text-left md:text-6xl">
              Contact <span class="text-mainGreen">Us</span>
            </p>
            <p class="my-4 text-center md:text-left">
              Any questions or remarks? Just write us a message!
            </p>
          </div>
          <div class="text-[#8D8D8D] font-medium">
            <form>
              <div class="grid md:grid-cols-2 gap-x-5 mb-4">
              
                <div>
                  <label for="firstname" class="block text-sm">First Name</label>
                  <input
                    id="firstname"
                    placeholder="First Name"
                    class="h-12 w-full mt-2 rounded-md bg-[#0F0F0F] border-2 border-[#8D8D8D] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-mainGreen"
                    type="text"
                    name="firstname"
                  />
                </div>
                <!-- Last Name Input -->
                <div>
                  <label for="lastname" class="block text-sm">Last Name</label>
                  <input
                    id="lastname"
                    placeholder="Last Name"
                    class="h-12 w-full mt-2 rounded-md bg-[#0F0F0F] border-2 border-[#8D8D8D] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-mainGreen"
                    type="text"
                    name="lastname"
                  />
                </div>
              </div>
              <!-- Email Input -->
              <div class="mb-4">
                <label for="email" class="block text-sm">Email</label>
                <input
                  id="email"
                  placeholder="Email"
                  class="h-12 w-full mt-2 rounded-md bg-[#0F0F0F] border-2 border-[#8D8D8D] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-mainGreen "     
                  type="email"
                  name="from_name"
                />
              </div>
              <!-- Message Textarea -->
              <div class="mb-4">
                <label for="message" class="block text-sm">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message.."
                  class="h-36 w-full mt-2 rounded-md bg-[#0F0F0F] border-2 border-[#8D8D8D] py-2 px-3 focus:outline-none focus:ring-2 focus:ring-mainGreen"
                ></textarea>
              </div>
              <!-- Submit Button -->
              <div class="mt-5">
               <Sendbutton />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <style scoped>

  .text-mainGreen {
    color: #00FF00; 
  }
  
  .bg-button-gradient {
    background: linear-gradient(45deg, #00FF00,black); 
  }
  </style>
  