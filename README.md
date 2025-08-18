A room-booking app I am making by following a video on the Traversy Media channel on Youtube.

This will be built with React, Next.js, Appwrite and Tailwind CSS.

---

Kind of a "ledger" of notes as I am doing this project (stuff I encounter as I follow Brad's tutorial and either fix it or just make a note of it for future reference):

- In the page component under "app/rooms/[id]", I got the following warning:
  "Route "/rooms/[id]" used `params.id`. `params` should be awaited before using its properties."

  To fix this issue, I simply made the component function async (by adding the keyword before the parentheses just like with a normal function) and then used the await keyword before the params, to wait for the params to fully come back before accessing the id from them. This is the official way of fixing this issue as per NextJS's documentation.

- Regarding the Appwrite environment keys - a few things have changed since Brad uploaded the video I am follwing. The NEXT_PUBLIC_APPWRITE_ENDPOINT has changed and now includes the region you specify during the initial Appwrite setup. To get the whole endpoint easily, you just need to go to the "Overview" page (accessed by clicking the "Overview" button on the left hand side of your Appwrite database page), then click the region at the top to copy and use it for the value of NEXT_PUBLIC_APPWRITE_ENDPOINT in your .env.local file.

Next to that, you will also find your Appwrite project's ID - you can click that as well to copy it and then paste it for your NEXT_PUBLIC_APPWRITE_PROJECT value, again which will be placed in your .env.local file.

- Since we are using NextJS, we cannot just install the Appwrite SDK - that would be the case if we were building a single page application (SPA). In this case, since we are using NextJS, we need to run the following command when installing Appwrite: npm i node-appwrite

- Server actions: the new and improved way to do things, instead of using API routes when pulling in data from your database

- We are creating middleware to protect certain routes, like the route for the Bookings page, My Rooms page, Add Rooms page etc. Middleware - essentially one or more functions that has/have access to the request/response cycle - sits between the server and client

- In the video, it is mentioned that we need to use the revalidatePath function in createNewRoom.js, to ensure that the cache is refreshed. This is to ensure that when the user is re-directed back to the home page a.k.a. Rooms page from the "Add a Room" page, the room that was just added is automatically shown to the user i.e. the user does not have to refresh the page manually to show the newly-added room. Couple of observations about this function:
  - This function throws an error similar to the following when used as shown in the video: "Route / used "revalidatePath /" during render which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions." I was unable to figure out exactly why this is happening, as I am clearly calling it in a file that has 'use server' and did it exactly as shown in the video. After a lot of research, I resorted to wrapping revalidatePath inside a call to [after](https://nextjs.org/docs/app/api-reference/functions/after).
  - However, it seems that this is not needed after all, since I am able to see new rooms that are added via the "Add a Room" page when I get re-directed back to the Rooms page, immediately after adding a new room. Indeed, a simple console.log inside the after() does not even appear in the browser console. Removing the after with the call to revalidatePath inside it does not break anything either, and I am still able to see the newly-added room on the Rooms page.
  - My thinking is, because we await the call to createDocument() in createNewRoom.js, the new room data first create the new room's entry in the Appwrite DB "rooms" collection, then our application state gets updated, and only then do we get re-directed back to the Rooms page. Which calls our getAllRooms() action, but by then the new room is already in the DB and gets shown as part of all the room in the DB. So revalidatePath() is not required here.

