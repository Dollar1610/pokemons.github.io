import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import imageFormatter from './imageFormatter';
import enumFormatter from './enumFormatter';

const pokemonsType = {
    'normal': 'normal',
    'poison': 'poison',
    'bug': 'bug',
    'flying': 'flying',
    'water': 'water',
    'fire': 'fire'
};
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons: []
        };

        this.save=this.save.bind(this);
    }

    save() {
        for (let i=0; i<20; i++) {
            let urll = `https://pokeapi.co/api/v2/pokemon/${i+1}/`;
            fetch(urll, {
                headers: {
                    'Content-type': 'text/html Access-Control-Allow-Origin: *'
                }
            })
                .then((response) => {
                        response.json()
                            .then((data) => {
                            const pokemons = this.state.pokemons;
                            pokemons.push({
                                id: i,
                                name: data.name,
                                image: data.sprites.front_default,
                                type: data.types[0].type.name,
                                abilities: data.abilities[0].ability.name,
                            });
                            this.setState({pokemons: pokemons});
                            });
                    }
                );

        }
    }

  render() {
    return (
        <div className='container' style={{marginTop:'80px'}}>
            <BootstrapTable data={ this.state.pokemons } borderd = {true} pagination={true} options={ {sizePerPage:5} }>
                <TableHeaderColumn dataField='id' filter={ { type: 'TextFilter', delay: 1000 } } isKey>#</TableHeaderColumn>
                <TableHeaderColumn dataField='name' filter={ { type: 'TextFilter', delay: 1000 } } >Name</TableHeaderColumn>
                <TableHeaderColumn dataField='image'  dataFormat={imageFormatter}>Avatar</TableHeaderColumn>
                <TableHeaderColumn dataField='type' filterFormatted dataFormat={ enumFormatter } formatExtraData={ pokemonsType }
                                   filter={ {type: 'SelectFilter', options: pokemonsType } } >Type</TableHeaderColumn>
                <TableHeaderColumn dataField='abilities' filter={ { type: 'TextFilter', delay: 1000 } } >Abilities</TableHeaderColumn>
            </BootstrapTable>
            <Button onClick={this.save}  bsStyle='primary'>Add Pokemons</Button>
        </div>
    );
  }
}

export default App;