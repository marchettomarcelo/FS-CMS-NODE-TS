import { useState } from 'react'
import { Switch } from '@headlessui/react'
import { useEffect } from 'react'

export default function SwitchItem({HandleSwitchChanges, publishOnNextBuild }:any) {


  const [enabled, setEnabled] = useState(false)

  useEffect(()=>{
    setEnabled(publishOnNextBuild)
  }, [publishOnNextBuild])

  const HandleChange = ()=>{
    let novo = !enabled
    setEnabled(novo)
    HandleSwitchChanges(novo)
  }

  return (
    <div className="py-16">
      <Switch
        checked={enabled}
        onChange={HandleChange}
        className={`${enabled ? 'bg-teal-600' :  'bg-red-700'}
          relative inline-flex flex-shrink-0 h-[38px] w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
        />
      </Switch>
    </div>
  )
}
