export function Input({ placeholder, value, onChange, ref , type, onKeyDown}: { placeholder: string; value?: any, ref?: any; type?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>)=> void ; onKeyDown?: (event: React.KeyboardEvent)=>void }) {
    return <div>
        <input ref={ref} onChange={onChange} value={value} placeholder={placeholder} type={type} onKeyDown={onKeyDown} className="px-4 py-2 rounded border m-2"></input>
    </div>
}