import React, { ReactNode } from 'react';

import API from './api';

import './RequestAPI.scss';

type MyProps = {
    children: ReactNode;
};
type MyState = {
    users: {
        id: number;
        name: string;
    }[];
    user: {
        name: string;
        id?: number;
    };
    endpoint: string;
};

class RequestAPI extends React.Component<MyProps, MyState> {
    constructor(props: MyProps) {
        super(props);
        this.state = {
            users: [],
            user: {
                name: '',
            },
            endpoint: 'users',
        };
    }

    async handleGet(): Promise<void> {
        const response = await API.get(this.state.endpoint);

        this.setState({
            users: response.data,
        });
    }

    public handlePost(): void {
        const body = {
            name: this.state.user.name,
        };
        const config = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        API.post(this.state.endpoint, body, config).then(response => {
            this.setState({
                user: response.data,
                users: [response.data],
            });
        });
    }

    public handlePut(): void {
        const url = `${this.state.endpoint}/1`;
        const body = {
            id: 1,
            name: 'Edwin Torres',
            username: 'Bret',
        };
        const config = {
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        };

        API.put(url, body, config).then(response => {
            this.setState({
                user: response.data,
                users: [response.data],
            });
        });
    }

    public handleDelete(): void {
        const url = `${this.state.endpoint}/1`;

        API.delete(url).then(() => {
            this.setState({
                users: [],
                user: {
                    name: '',
                },
            });
        });
    }

    public handleFieldChange(event: { target: HTMLInputElement; }): void {
        this.setState({
            user: {
                name: event.target.value,
            },
        });
    }

    public renderField(): React.ReactChild {
        return (
            <div className="RequestAPI__field">
                <div className="Column__offset-md-2">
                    <input
                        id="text-field-1"
                        placeholder="e.g. Jonh Doe"
                        onChange={this.handleFieldChange.bind(this)}
                    />
                </div>
            </div>
        );
    }

    public renderButtons(): React.ReactChild {
        return (
            <div className="RequestAPI__field">
                <div>
                    <button className="RequestAPI__button-get" onClick={this.handleGet.bind(this)}>
                        GET
                    </button>
                </div>
                <div>
                    <button className="RequestAPI__button-post" onClick={this.handlePost.bind(this)}>
                        POST
                    </button>
                </div>
                <div>
                    <button className="RequestAPI__button-put" onClick={this.handlePut.bind(this)}>
                        PUT
                    </button>
                </div>
                <div>
                    <button className="RequestAPI__button-delete" onClick={this.handleDelete.bind(this)}>
                        DELETE
                    </button>
                </div>
            </div>
        );
    }

    public renderResults() {
        const userList =
            this.state.users &&
            this.state.users.map(user => {
                return <li key={user.id}>{user.name}</li>;
            });

        let results = <div></div>;

        if (userList.length > 0) {
            results = (
                <div>
                    <div className="RequestAPI__results">
                        <div>{userList}</div>
                    </div>
                </div>
            );
        }

        return results;
    }

    render(): React.ReactChild {
        return (
            <div className="RequestAPI">
                <div className="RequestAPI__title">
                    <div>
                        <p>
                            Here you will find an example using <strong>Axios</strong> in order to consume a public API.
                            This example uses the{' '}
                            <a className="Link__link" href="https://jsonplaceholder.typicode.com" target="_blank"
                               rel="noopener noreferrer">
                                jsonplaceholder
                            </a>{' '}
                            public API.
                        </p>
                    </div>
                </div>

                {this.renderField()}
                {this.renderButtons()}
                {this.renderResults()}
            </div>
        );
    }
}

export default RequestAPI;
