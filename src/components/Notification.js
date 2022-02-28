// import { useToast } from "@chakra-ui/react";
// import React from "react";
// import io from "socket.io-client";

// const socket = io.connect("https://acavms.herokuapp.com");

// const Notification = ({ state }) => {
//   const toast = useToast();

//   return (
//     <div>
//       {React.useEffect(() => {
//         socket.on("connection");
//         socket.on("alert", () => {
//           toast({
//             title: "New Notification",
//             description: "You have a new notification. Check your dashboard.",
//             status: "info",
//             duration: 9000,
//             isClosable: true,
//             position: "top-right",
//           });
//         });
//       }, [toast, state])}
//     </div>
//   );
// };

// export default Notification;
