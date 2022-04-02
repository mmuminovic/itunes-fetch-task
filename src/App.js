import { useState, useEffect, useCallback } from 'react';
import { useMutation } from 'react-query';
import './App.css';
import { searchMusic } from './utils/itunesApi';

const initialList = ['A', 'B', 'C', 'D', 'E'];

function App() {
    const [search, setSearch] = useState('');
    const [list, setList] = useState(initialList);
    const [data, setData] = useState([]);

    const { mutate: doSearch } = useMutation(() => searchMusic(search), {
        onSuccess: (res) => {
            const searchResults = res.results
                .map((item) => item.collectionName)
                .filter((x) => !!x)
                .slice(0, 5);
            setData(searchResults);
        },
    });

    const submitHandler = () => {
        if (search) {
            doSearch();
        } else {
            setData(initialList);
        }
    };

    const reorder = useCallback(() => {
        let first = list[0];
        const newList = list.slice(1, list.length);
        if (data.length) {
            first = data[0];
            setData(data.slice(1, data.length));
        }
        newList.push(first);
        setList(newList);
    }, [list, data]);

    useEffect(() => {
        setTimeout(() => {
            reorder();
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);

    return (
        <div className="App">
            <div className="wrapper">
                <input
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Band"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submitHandler();
                        }
                    }}
                />
                <div className="list-wrapper">
                    {list.map((item) => (
                        <div key={item} className="list-item">
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
