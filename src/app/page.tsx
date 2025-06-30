"use client";

import { use, useEffect, useState } from "react";
import CopyButton from "../components/ui/CopyButton";
import Option from "../components/ui/Option";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const defaultPassword = "P4$5W0rD!";
  const [generated, setGenerated] = useState<string>("");

  const [length, setLength] = useState<number>(0);
  const [includesUppercase, setIncludesUppercase] = useState<boolean>(false);
  const [includesLowercase, setIncludesLowercase] = useState<boolean>(false);
  const [includesNumbers, setIncludesNumbers] = useState<boolean>(false);
  const [includesSymbols, setIncludesSymbols] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "1234567890";
  const symbolChars = "!@#$%^&*()-_=+[]{}|;:',.<>?/~`";

  const [chars, setChars] = useState<string>("");

  /* SETTING THE CHARACTERS */

  useEffect(() => {
    let pool = "";

    if (includesLowercase) {
      pool += lowerCaseChars;
    }

    if (includesNumbers) {
      pool += numberChars;
    }
    if (includesSymbols) {
      pool += symbolChars;
    }
    if (includesUppercase) {
      pool += upperCaseChars;
    }

    function shuffleString(str: string): string {
      const arr = [...str];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join("");
    }
    setChars(shuffleString(pool));
  }, [includesUppercase, includesLowercase, includesNumbers, includesSymbols]);

  useEffect(() => {
    if (generated?.trim() === "") {
      setGenerated(defaultPassword);
    }
  }, []);

  /* DETERMINING IF TO DISABLE BUTTON */

  useEffect(() => {
    if (length > 0) {
      if (
        includesUppercase ||
        includesNumbers ||
        includesLowercase ||
        includesSymbols
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    } else {
      setDisabled(true);
    }
  }, [
    length,
    includesUppercase,
    includesNumbers,
    includesSymbols,
    includesLowercase,
  ]);

  const handleGenerateClick = () => {
    const selectedCount = [
      includesUppercase,
      includesLowercase,
      includesNumbers,
      includesSymbols,
    ].filter(Boolean).length;

    if (length > 0 && chars.length > 0) {
      if (length >= selectedCount) {
        let guaranteedChars: string[] = [];

        if (includesUppercase) {
          guaranteedChars.push(
            upperCaseChars.charAt(
              Math.floor(Math.random() * upperCaseChars.length)
            )
          );
        }
        if (includesLowercase) {
          guaranteedChars.push(
            lowerCaseChars.charAt(
              Math.floor(Math.random() * lowerCaseChars.length)
            )
          );
        }
        if (includesNumbers) {
          guaranteedChars.push(
            numberChars.charAt(Math.floor(Math.random() * numberChars.length))
          );
        }
        if (includesSymbols) {
          guaranteedChars.push(
            symbolChars.charAt(Math.floor(Math.random() * symbolChars.length))
          );
        }

        const remainingLength = length - guaranteedChars.length;
        let passwordChars = [...guaranteedChars];

        for (let i = 0; i < remainingLength; i++) {
          passwordChars.push(
            chars.charAt(Math.floor(Math.random() * chars.length))
          );
        }

        // Fisher-Yates shuffle
        for (let i = passwordChars.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [passwordChars[i], passwordChars[j]] = [
            passwordChars[j],
            passwordChars[i],
          ];
        }

        setGenerated(passwordChars.join(""));
      } else {
        // Length less than selected categories — generate fully random
        let passwordChars: string[] = [];
        for (let i = 0; i < length; i++) {
          passwordChars.push(
            chars.charAt(Math.floor(Math.random() * chars.length))
          );
        }
        setGenerated(passwordChars.join(""));
      }
    } else {
      setGenerated("");
    }
  };
  return (
    <main className="h-full flex items-center justify-center">
      <section className="w-[90%] max-w-[600px]  flex flex-col items-center gap-8">
        <h1 className="text-zinc-400 font-bold text-2xl md:text-3xl">
          Password Generator
        </h1>

        {/* DISPLAY THE PASSWORD */}

        <div className="p-5 container flex items-center justify-between">
          <h1
            className={` ${
              generated === defaultPassword && "text-zinc-600"
            } text-3xl font-semibold`}
          >
            {generated}
          </h1>

          {/* COPY BUTTON */}
          <CopyButton password={generated} />
        </div>

        {/* PASSWORD CUSTOM INPUTS */}

        <div className="p-5 container flex flex-col items-center justify-center gap-6">
          <div className="flex w-full items-center justify-between">
            <h1 className="text-lg font-bold">Character Length</h1>

            <p className="text-3xl font-bold greenText">{length}</p>
          </div>

          <div className="w-full">
            <input
              type="range"
              className="w-full"
              min={0}
              max={20}
              defaultValue={0}
              onChange={(e) => setLength(Number(e.target.value))}
            ></input>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Option
              includesCustom={includesUppercase}
              setIncludesCustom={setIncludesUppercase}
              id="uppercase"
              option="Uppercase Letters"
            />
            <Option
              includesCustom={includesLowercase}
              setIncludesCustom={setIncludesLowercase}
              id="lowercase"
              option="Lowercase Letters"
            />
            <Option
              includesCustom={includesNumbers}
              setIncludesCustom={setIncludesNumbers}
              id="numbers"
              option="Numbers"
            />
            <Option
              includesCustom={includesSymbols}
              setIncludesCustom={setIncludesSymbols}
              id="symbols"
              option="Symbols"
            />
          </div>

          <div className="w-full">
            <button
              onClick={handleGenerateClick}
              disabled={disabled}
              type="button"
              className={`w-full text-lg border-2 border-[#a4feae] text-black bg-[#a4feae] ${
                disabled
                  ? "cursor-not-allowed"
                  : "cursor-pointer hover:bg-transparent hover:text-[#a4feae]"
              }  transition-all duration-300 ease-in-out font-bold uppercase p-3 flex items-center justify-center gap-2`}
            >
              <p>Generate</p>
              <ArrowRight size={15} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
