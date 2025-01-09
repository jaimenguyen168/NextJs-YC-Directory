"use client"

import Link from "next/link";
import {XIcon} from "lucide-react";

const SearchFormReset = () => {

  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement

    if (form) form.reset()
  }

  return (
    <button type="reset" onClick={reset}>
      <Link href="/public" className="search-btn text-white">
        <XIcon className="size-5"/>
      </Link>
    </button>
  )
}
export default SearchFormReset
