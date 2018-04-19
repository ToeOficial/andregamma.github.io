import React, { Component } from 'react';
import css from './ChampionDisplay.scss';

class ChampionDisplay extends Component {
  champions = [{ name: 'Androxus', role: 'Flanco' },
    { name: 'Ash', role: 'Tanque' },
    { name: 'Barik', role: 'Tanque' },
    { name: 'Bomb King', role: 'Dano' },
    { name: 'Buck', role: 'Flanco' },
    { name: 'Cassie', role: 'Dano' },
    { name: 'Drogoz', role: 'Dano' },
    { name: 'Evie', role: 'Flanco' },
    { name: 'Fernando', role: 'Tanque' },
    { name: 'Grohk', role: 'Suporte' },
    { name: 'Grover', role: 'Suporte' },
    { name: 'Inara', role: 'Tanque' },
    { name: 'Kinessa', role: 'Dano' },
    { name: 'Lex', role: 'Flanco' },
    { name: 'Lian', role: 'Dano' },
    { name: 'Maeve', role: 'Flanco' },
    { name: 'Makoa', role: 'Tanque' },
    { name: 'Mal\'Damba', role: 'Suporte' },
    { name: 'Pip', role: 'Suporte' },
    { name: 'Ruckus', role: 'Tanque' },
    { name: 'Seris', role: 'Suporte' },
    { name: 'Sha Lin', role: 'Dano' },
    { name: 'Skye', role: 'Flanco' },
    { name: 'Torvald', role: 'Tanque' },
    { name: 'Tyra', role: 'Dano' },
    { name: 'Viktor', role: 'Dano' },
    { name: 'Willo', role: 'Dano' },
    { name: 'Ying', role: 'Suporte' },
    { name: 'Zhin', role: 'Flanco' }];

  constructor(props) {
    super(props);

    const selectedChampion = this.champions[Math.floor(Math.random()*this.champions.length)];

    this.state = {
      champion: selectedChampion.name,
      health: Math.round(this.props.stats.maxHealth * this.getMulti(selectedChampion.role)),
      multi: this.getMulti(selectedChampion.role),
      role: selectedChampion.role,
      dead: false //needed for animation
    };
  }

  respawn() {
    const selectedChampion = this.champions[Math.floor(Math.random()*this.champions.length)];

    this.setState({
      champion: selectedChampion.name,
      health: Math.round(this.props.stats.maxHealth * this.getMulti(selectedChampion.role)),
      role: selectedChampion.role,
      multi: this.getMulti(selectedChampion.role)
    });
  }

  getMulti(role) {
    switch (role) {
      case 'Tanque':
        return 2;
      case 'Suporte':
        return 1.5;
      case 'Dano':
        return 1.5;
      case 'Flanco':
        return 1;
      default:
        return 1;
    }
  }

  click() {
    if (this.state.dead) {
      return;
    }

    if (this.state.health - this.props.stats.damage <= 0) {
      this.setState({
        dead: true
      });
      setTimeout(()=>{
        this.setState((prevState, props) => {
          return {
            dead: false
          };
        });
        
        this.respawn();
      }, 500);
      this.props.deadHandler();
      return;
    }

    this.setState((prevState, props) => {
      return {
        health: prevState.health - this.props.stats.damage
      };
    });
  }

  render() {
    const imageSource = require(`../../assets/champions/${this.state.champion}.png`);

    let progressWidth = (Math.round((1-(this.state.health/Math.round(this.props.stats.maxHealth*this.state.multi)))*100))+'%';
    if (this.state.dead) {
      progressWidth = '100%';
    }

    return (
      <div className={css.root}>
        <div className={css.wrapper}>
          <div className={`${css.name}${this.state.dead ? ` ${css.dead}` : ''}`}>
            <span className={css.nameTooltipBase}>{this.state.dead ? '' : this.state.champion}<span role="tooltip" className={css.nameTooltip}>{this.state.champion}<br/>{this.state.role}</span></span>
          </div>
          <div className={css.healthWrapper}>
            <div className={css.healthProgress} style={{ width: progressWidth }} />
            <span role="tooltip" className={css.healthTooltip}><span className={css.unflip}>{this.state.dead ? 0 : this.state.health}/{Math.round(this.props.stats.maxHealth*this.state.multi)}</span></span>
          </div>
          <div className={`${css.triangle}${this.state.dead ? ` ${css.dead}` : ''}`} />
          <div className={css.champion} onClick={()=>{this.click()}}>
            <img className={`${css.image}${this.state.dead ? ` ${css.dead}` : ''}`} src={imageSource} width="225px" height="225px" draggable="false" alt={this.state.champion} />
          </div>
        </div>
      </div>
    );
  }
}

export default ChampionDisplay;
