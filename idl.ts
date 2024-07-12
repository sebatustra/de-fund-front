export type FundProgram = {
    "address": "6vUjvBGWETdE4duVqQBeu4WLCC3XgDkCmzhx4aCC7V4g",
    "metadata": {
      "name": "fund",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "addInvestment",
        "discriminator": [
          225,
          87,
          62,
          154,
          100,
          172,
          171,
          212
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "investment",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    105,
                    110,
                    118,
                    101,
                    115,
                    116,
                    109,
                    101,
                    110,
                    116
                  ]
                },
                {
                  "kind": "arg",
                  "path": "identifier"
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "identifier",
            "type": "string"
          },
          {
            "name": "investmentAmount",
            "type": "i64"
          },
          {
            "name": "maturityDate",
            "type": "i64"
          }
        ]
      },
      {
        "name": "buyShares",
        "discriminator": [
          40,
          239,
          138,
          154,
          8,
          37,
          106,
          108
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "fundTokenMint",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    105,
                    110,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "buyerFundTokenAccount",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "buyer"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "fundTokenMint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "usdcMint",
            "writable": true
          },
          {
            "name": "fundUsdcVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100,
                    95,
                    117,
                    115,
                    100,
                    99,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "buyerUsdcTokenAccount",
            "writable": true
          },
          {
            "name": "buyer",
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associatedTokenProgram",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "usdcAmount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializeFund",
        "discriminator": [
          212,
          42,
          24,
          245,
          146,
          141,
          78,
          198
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "fundTokenMint",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    105,
                    110,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "fundSharesVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100,
                    95,
                    115,
                    104,
                    97,
                    114,
                    101,
                    115,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "initialInvestment",
            "type": "u64"
          },
          {
            "name": "initialShares",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initializeUsdcVault",
        "discriminator": [
          186,
          93,
          213,
          60,
          171,
          158,
          253,
          207
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "usdcMint"
          },
          {
            "name": "usdcVault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100,
                    95,
                    117,
                    115,
                    100,
                    99,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "tokenProgram",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": []
      },
      {
        "name": "payInvestment",
        "discriminator": [
          16,
          184,
          229,
          5,
          55,
          113,
          249,
          253
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "investment",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    105,
                    110,
                    118,
                    101,
                    115,
                    116,
                    109,
                    101,
                    110,
                    116
                  ]
                },
                {
                  "kind": "arg",
                  "path": "identifier"
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "systemProgram",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "identifier",
            "type": "string"
          },
          {
            "name": "paymentAmount",
            "type": "i64"
          },
          {
            "name": "paymentDate",
            "type": "i64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "fundAccount",
        "discriminator": [
          49,
          104,
          168,
          214,
          134,
          180,
          173,
          154
        ]
      },
      {
        "name": "investmentAccount",
        "discriminator": [
          224,
          94,
          99,
          125,
          248,
          193,
          145,
          215
        ]
      }
    ],
    "types": [
      {
        "name": "fundAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "manager",
              "type": "pubkey"
            },
            {
              "name": "fundTokenMint",
              "type": "pubkey"
            },
            {
              "name": "fundSharesVault",
              "type": "pubkey"
            },
            {
              "name": "usdcVault",
              "type": {
                "option": "pubkey"
              }
            },
            {
              "name": "totalShares",
              "type": "u64"
            },
            {
              "name": "totalValue",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "investmentAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "investmentAmount",
              "type": "i64"
            },
            {
              "name": "paymentAmount",
              "type": {
                "option": "i64"
              }
            },
            {
              "name": "maturityDate",
              "type": "i64"
            },
            {
              "name": "paymentDate",
              "type": {
                "option": "i64"
              }
            },
            {
              "name": "isActive",
              "type": "bool"
            },
            {
              "name": "identifier",
              "type": "string"
            }
          ]
        }
      }
    ]
  };
  

export const IDL = {
    "address": "6vUjvBGWETdE4duVqQBeu4WLCC3XgDkCmzhx4aCC7V4g",
    "metadata": {
      "name": "fund",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Created with Anchor"
    },
    "instructions": [
      {
        "name": "add_investment",
        "discriminator": [
          225,
          87,
          62,
          154,
          100,
          172,
          171,
          212
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "investment",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    105,
                    110,
                    118,
                    101,
                    115,
                    116,
                    109,
                    101,
                    110,
                    116
                  ]
                },
                {
                  "kind": "arg",
                  "path": "identifier"
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "identifier",
            "type": "string"
          },
          {
            "name": "investment_amount",
            "type": "i64"
          },
          {
            "name": "maturity_date",
            "type": "i64"
          }
        ]
      },
      {
        "name": "buy_shares",
        "discriminator": [
          40,
          239,
          138,
          154,
          8,
          37,
          106,
          108
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "fund_token_mint",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    105,
                    110,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "buyer_fund_token_account",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "account",
                  "path": "buyer"
                },
                {
                  "kind": "const",
                  "value": [
                    6,
                    221,
                    246,
                    225,
                    215,
                    101,
                    161,
                    147,
                    217,
                    203,
                    225,
                    70,
                    206,
                    235,
                    121,
                    172,
                    28,
                    180,
                    133,
                    237,
                    95,
                    91,
                    55,
                    145,
                    58,
                    140,
                    245,
                    133,
                    126,
                    255,
                    0,
                    169
                  ]
                },
                {
                  "kind": "account",
                  "path": "fund_token_mint"
                }
              ],
              "program": {
                "kind": "const",
                "value": [
                  140,
                  151,
                  37,
                  143,
                  78,
                  36,
                  137,
                  241,
                  187,
                  61,
                  16,
                  41,
                  20,
                  142,
                  13,
                  131,
                  11,
                  90,
                  19,
                  153,
                  218,
                  255,
                  16,
                  132,
                  4,
                  142,
                  123,
                  216,
                  219,
                  233,
                  248,
                  89
                ]
              }
            }
          },
          {
            "name": "usdc_mint",
            "writable": true
          },
          {
            "name": "fund_usdc_vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100,
                    95,
                    117,
                    115,
                    100,
                    99,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "buyer_usdc_token_account",
            "writable": true
          },
          {
            "name": "buyer",
            "writable": true,
            "signer": true
          },
          {
            "name": "token_program",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "associated_token_program",
            "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "rent",
            "address": "SysvarRent111111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "usdc_amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initialize_fund",
        "discriminator": [
          212,
          42,
          24,
          245,
          146,
          141,
          78,
          198
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "fund_token_mint",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    109,
                    105,
                    110,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "fund_shares_vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100,
                    95,
                    115,
                    104,
                    97,
                    114,
                    101,
                    115,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "token_program",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "initial_investment",
            "type": "u64"
          },
          {
            "name": "initial_shares",
            "type": "u64"
          }
        ]
      },
      {
        "name": "initialize_usdc_vault",
        "discriminator": [
          186,
          93,
          213,
          60,
          171,
          158,
          253,
          207
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "usdc_mint"
          },
          {
            "name": "usdc_vault",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100,
                    95,
                    117,
                    115,
                    100,
                    99,
                    95,
                    118,
                    97,
                    117,
                    108,
                    116
                  ]
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          },
          {
            "name": "token_program",
            "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
          }
        ],
        "args": []
      },
      {
        "name": "pay_investment",
        "discriminator": [
          16,
          184,
          229,
          5,
          55,
          113,
          249,
          253
        ],
        "accounts": [
          {
            "name": "fund",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    102,
                    117,
                    110,
                    100
                  ]
                }
              ]
            }
          },
          {
            "name": "investment",
            "writable": true,
            "pda": {
              "seeds": [
                {
                  "kind": "const",
                  "value": [
                    105,
                    110,
                    118,
                    101,
                    115,
                    116,
                    109,
                    101,
                    110,
                    116
                  ]
                },
                {
                  "kind": "arg",
                  "path": "identifier"
                }
              ]
            }
          },
          {
            "name": "manager",
            "writable": true,
            "signer": true
          },
          {
            "name": "system_program",
            "address": "11111111111111111111111111111111"
          }
        ],
        "args": [
          {
            "name": "_identifier",
            "type": "string"
          },
          {
            "name": "payment_amount",
            "type": "i64"
          },
          {
            "name": "payment_date",
            "type": "i64"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "FundAccount",
        "discriminator": [
          49,
          104,
          168,
          214,
          134,
          180,
          173,
          154
        ]
      },
      {
        "name": "InvestmentAccount",
        "discriminator": [
          224,
          94,
          99,
          125,
          248,
          193,
          145,
          215
        ]
      }
    ],
    "types": [
      {
        "name": "FundAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "manager",
              "type": "pubkey"
            },
            {
              "name": "fund_token_mint",
              "type": "pubkey"
            },
            {
              "name": "fund_shares_vault",
              "type": "pubkey"
            },
            {
              "name": "usdc_vault",
              "type": {
                "option": "pubkey"
              }
            },
            {
              "name": "total_shares",
              "type": "u64"
            },
            {
              "name": "total_value",
              "type": "u64"
            }
          ]
        }
      },
      {
        "name": "InvestmentAccount",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "investment_amount",
              "type": "i64"
            },
            {
              "name": "payment_amount",
              "type": {
                "option": "i64"
              }
            },
            {
              "name": "maturity_date",
              "type": "i64"
            },
            {
              "name": "payment_date",
              "type": {
                "option": "i64"
              }
            },
            {
              "name": "is_active",
              "type": "bool"
            },
            {
              "name": "identifier",
              "type": "string"
            }
          ]
        }
      }
    ]
}