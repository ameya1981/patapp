const uploads_dir_name = 'uploads';
//const uploads_dir = '/home/bitnami/git_repos/patapp/' + uploads_dir_name;
const uploads_dir = '/opt/bitnami/apps/patapp/' + uploads_dir_name;

module.exports = {
        port : 9999,
        uploads_dir : uploads_dir,
        uploads_dir_name : uploads_dir_name
    }
