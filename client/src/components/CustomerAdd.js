import { withStyles, Dialog, Button, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';

const styles = theme => ({
    hidden: {
        display: "none"
    }
});

class CustomerAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            userName: "",
            age: "",
            gender: "",
            job: "",
            fileName: "",
            open: false
        };
    }

    submitHandler = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then(res => {
                console.log(res.data);
                this.props.stateRefresh();
            });
        this.setState({
            file: null,
            userName: "",
            age: "",
            gender: "",
            job: "",
            fileName: "",
            open: false
        });
    }

    fileHandler = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        });
    }

    valueHandler = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    addCustomer = () => {
        const url = "/api/customers";
        const formData = new FormData();
        formData.append("image", this.state.file);
        formData.append("name", this.state.userName);
        formData.append("age", this.state.age);
        formData.append("gender", this.state.gender);
        formData.append("job", this.state.job);
        const config = {
            headers: {
                "content-type": "multipart/form-data"
            }
        };
        return axios.post(url, formData, config);
    }

    clickOpenHandler = () => {
        this.setState({
            open: true
        });
    }

    clickCloseHandler = () => {
        this.setState({
            file: null,
            userName: "",
            age: "",
            gender: "",
            job: "",
            fileName: "",
            open: false
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.clickOpenHandler}>고객 추가하기</Button>
                <Dialog open={this.state.open} onClose={this.clickCloseHandler}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.fileHandler} /><br />
                        <label htmlFor='raised-button-file'>
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label><br />
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.valueHandler}></TextField><br />
                        <TextField label="나이" type="text" name="age" value={this.state.age} onChange={this.valueHandler}></TextField><br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.valueHandler}></TextField><br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.valueHandler}></TextField><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.submitHandler}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.clickCloseHandler}>취소</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CustomerAdd);