import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { BsQrCode } from 'react-icons/bs';

const Search = ({ onSearch }: { onSearch : (value: string)=>void}) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // Pasamos el valor de búsqueda al componente padre
    };

    return (
        <div className={'mx-6 flex gap-2 px-4 w-full flex-row items-center border border-bg_secondary rounded-full'}>
            <BiSearch size={24}  />
            <input
                type="text"
                placeholder="Buscar vehículo..."
                value={query}
                className={' p-2'}
                onChange={handleSearch}
                /*style={{
                    padding: '10px',
                    width: '100%',
                    maxWidth: '400px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}*/
            />
            <BsQrCode size={24}  />
        </div>
    );
};

export default Search;
