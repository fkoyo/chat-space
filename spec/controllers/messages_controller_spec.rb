require 'rails_helper'

describe MessagesController do
  let(:group) { create(:group) }
  let(:user) { create(:user) }

  describe '#index' do

    context 'log in' do
      before do
        login user
        get :index, params: { group_id: group.id }
      end

      it 'assigns @message' do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it 'assigns @group' do
        expect(assigns(:group)).to eq group
      end

      it 'renders index' do
        expect(response).to render_template :index
      end
    end

    context 'not log in' do
      before do
        get :index, params: { group_id: group.id }
      end

      it 'redirects to new_user_session_path' do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe '#create' do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context 'log in' do
      before do
        login user
      end

      context 'can save' do
        subject {
          post :create,
          params: params
        }

        it 'count up message' do
          expect{ subject }.to change(Message, :count).by(1)
        end

        it 'redirects to group_messages_path' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end

      context 'can not save' do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil) } }

        subject {
          post :create,
          params: invalid_params
        }

        it 'does not count up' do
          expect{ subject }.not_to change(Message, :count)
        end

        it 'renders index' do
          subject
          expect(response).to render_template :index
        end
      end
    end

    context 'not log in' do

      it 'redirects to new_user_session_path' do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end

# require 'rails_helper'

# describe MessagesController, type: :controller do

# # 1 ログインしている場合
# #   1-1 アクション内で定義しているインスタンス変数があるか
# #   1-2 該当するビューが描画されているか
# # 2 ログインしていない場合
# #   2-1 意図したビューにリダイレクトできているか

#   describe 'GET #index' do
#     it "assigns the requested messages to @messages" do
#       messages = create_list(:message, 3)
#       get :index
#       expect(assigns(:messages)).to match(messages)
#     end

#     # it "assigns the requested users to @users" do
#     #   users = create_list(:user, 3)
#     #   get :index
#     #   expect(assigns(:message)).to match(messages)
#     # end

#     it "renders the :index template" do
#       get :index
#       expect(response).to render_template :index
#     end
#   end
# end
