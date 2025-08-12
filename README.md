A room-booking app I am making by following a video on the Traversy Media channel on Youtube.

This will be built with React, Next.js, Appwrite and Tailwind CSS.

---

Kind of a "ledger" of notes as I am doing this project (stuff I encounter as I follow Brad's tutorial and either fix it or just make a note of it for future reference):

- In the page component under "app/rooms/[id]", I got the following warning:
  "Route "/rooms/[id]" used `params.id`. `params` should be awaited before using its properties."

  To fix this issue, I simply made the component function async (by adding the keyword before the parenthese just like with a normal function) and then used the await keyword before the params, to wait for the params to fully come back before accessing the id from them. This is the official way of fixing this issue as per NextJS's documentation.

- Regarding the Appwrite environment keys - a few things have changed since Brad uploaded the video I am follwing. The NEXT_PUBLIC_APPWRITE_ENDPOINT has changed and now includes the region you specify during the initial Appwrite setup. To get the whole endpoint easily, you just need to go to the "Overview" page (accessed by clicking the "Overview" button on the left hand side of your Appwrite database page), then click the region at the top to copy and use it for the value of NEXT_PUBLIC_APPWRITE_ENDPOINT in your .env.local file.

Next to that, you will also find your Appwrite project's ID - you can click that as well to copy it and then paste it for your NEXT_PUBLIC_APPWRITE_PROJECT value, again which will be placed in your .env.local file.

- Since we are using NextJS, we cannot just install the Apprwite SDK - that would be the case if we were building a single page appication (SPA). In this case, since we are using NextJS, we need to run the following command when installing Apprwite: npm i node-appwrite

- Server actions: the new and improved way to do things, instead of using API routes when pulling in data from your database

- We are creating middleware to protect certain routes, like the route for the Bookings page, My Rooms page, Add Rooms page etc. Middleware - essentially one or more functions that has/have access to the request/response cycle - sits between the server and client

