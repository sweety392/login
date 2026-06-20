"use client";

import {
  useSession,
  signOut
} from "next-auth/react";

export default function UserMenu() {

  const { data: session } =
    useSession();

  return (
    <div>

      {session ? (
        <>
          <p>
            {session.user.name}
          </p>

          <button
            onClick={() => signOut()}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Not Logged In</p>
      )}

    </div>
  );
}