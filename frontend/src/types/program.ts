export const IDL = {
  "version": "0.1.0",
  "name": "cpi",
  "instructions": [
    {
      "name": "solTransfer",
      "accounts": [
        {
          "name": "sender",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "recipient",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ]
}

export const PROGRAM_ID = "aNbt52ShQ7Voq4uCMeRRELSXajgPKwD6FpNZ8vq2UPj"
