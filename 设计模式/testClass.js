var checkObject = function() {
    this.checkName = function() {
        return 'name';
    };

    this.checkEmail = function() {
        return 'email';
    };

    this.checkPassword = function() {
        return 'password';
    };
};

var a = new checkObject();
console.log(a.checkName());

var CheckObject = function(){};
CheckObject.prototype = {
    checkName: function(){
        return this;
    },
    checkEmail: function(){
        return this;
    },
    checkPassword: function(){
        return this;
    }
};

var a = new CheckObject();
a.checkName().checkEmail().checkPassword();


Function.prototype.addMethod = function(name, fn) {
    this[name] = fn;
};

var methods = new Function();
methods.addMethod('checkName', function(){
    console.log('checkName');
});
methods.checkName();

var b = {
    addMethod: function(name, fn){
        this[name] = fn;
    }
}

var c = Object.create(b);
c.addMethod("showName", function(){
    console.log('showName'); 
});
c.showName();
