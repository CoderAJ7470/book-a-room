A room-booking app I am making by following a video on the Traversy Media channel on Youtube.

This will be built with React, Next.js, Appwrite and Tailwind CSS.

---

Kind of a "ledger" of notes as I am doing this project (stuff I encounter as I follow Brad's tutorial and either fix it or just make a note of it for future reference):

- In the page component under "app/rooms/[id]", I got the following warning:
  "Route "/rooms/[id]" used `params.id`. `params` should be awaited before using its properties."

  To fiux this issue, I simply made the component function async (by adding the keyword before the parenthese just like with a normal function) and then used the await keyword before the params, to wait for the params to fully come back before accessing the id from them.

